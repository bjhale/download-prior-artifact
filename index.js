import core from '@actions/core';
import github from '@actions/github';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import fs from 'fs';
import decompress from 'decompress';
import os from 'os';
import { Buffer } from 'buffer';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('UTC');

const githubToken = core.getInput('github_token', { required: true });
const repository = core.getInput('repository', { required: true });
const minimumAge = parseInt(core.getInput('minimum_age')) || 0;
const [owner, repo] = repository.split('/');
const name = core.getInput('artifact_name') || null;
const directory = core.getInput('directory') || "artifact";

const octokit = github.getOctokit(githubToken);

const per_page = 100;

const { data } = await octokit.request("GET /repos/{owner}/{repo}/actions/artifacts",{
  owner,
  repo,
  per_page,
  name
});

const artifacts = data.artifacts;

for(const artifact of artifacts) {
  if (dayjs(artifact.created_at).isBefore(dayjs().subtract(minimumAge, 'hour').tz('UTC'))) {
    const response = await octokit.request('GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/zip',{
      owner,
      repo,
      artifact_id: artifact.id
    });

    fs.appendFileSync(`${os.tmpdir()}/${artifact.name}.zip`, Buffer.from(response.data));
    decompress(`${os.tmpdir()}/${artifact.name}.zip`, directory);
    fs.unlinkSync(`${os.tmpdir()}/${artifact.name}.zip`);

    console.log(response);
    break;
  }
}