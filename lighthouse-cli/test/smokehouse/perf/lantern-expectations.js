/**
 * @license Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

/**
 * Expected Lighthouse audit values for lantern smoketests
 */
module.exports = [
  {
    lhr: {
      requestedUrl: 'http://localhost:10200/online-only.html',
      finalUrl: 'http://localhost:10200/online-only.html',
      audits: {
        'first-contentful-paint': {
          rawValue: '>2000',
        },
        'first-cpu-idle': {
          rawValue: '>2000',
        },
        'interactive': {
          rawValue: '>2000',
        },
      },
    },
  },
  {
    lhr: {
      requestedUrl: 'http://localhost:10200/tricky-main-thread.html?setTimeout',
      finalUrl: 'http://localhost:10200/tricky-main-thread.html?setTimeout',
      audits: {
        interactive: {
          // Make sure all of the CPU time is reflected in the perf metrics as well.
          score: '<.2'
        },
        'bootup-time': {
          details: {
            items: {
              0: {
              // FIXME: Appveyor finds this particular assertion very flaky for some reason :(
                url: process.env.APPVEYOR ? /main/ : /main-thread-consumer/,
                scripting: '>1000',
              },
            },
          },
        },
      },
    },
  },
  {
    lhr: {
      requestedUrl: 'http://localhost:10200/tricky-main-thread.html?fetch',
      finalUrl: 'http://localhost:10200/tricky-main-thread.html?fetch',
      audits: {
        interactive: {
          // Make sure all of the CPU time is reflected in the perf metrics as well.
          score: '<.2'
        },
        'bootup-time': {
          details: {
            items: {
              0: {
              // TODO: requires async stacks, https://github.com/GoogleChrome/lighthouse/pull/5504
              // url: /main-thread-consumer/,
                scripting: '>1000',
              },
            },
          },
        },
      },
    },
  },
];
