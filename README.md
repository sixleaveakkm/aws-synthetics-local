# aws-synthetics-local
**NOT TEST YET**

This a simple alternative library to develop [AWS Synthetics Canary](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_Function_Library.html) (syn-1.0) locally, since aws hasn't release the `syn-1.0` library.

This repository use `puppeteer` rather than `puppeteer-core` for better debug experience,
so you will download Chromium while `npm install`.

Cooperate with [aws-synthetics-logger](https://www.npmjs.com/package/@sixleaveakkm/aws-synthetics-logger-local)

For no code change replacement, add following two develop dependencies to your `package.json`
```json
{
    "devDependencies": {
        "Synthetics": "npm:@sixleaveakkm/aws-synthetics-local@0.2.0",
        "SyntheticsLogger": "npm:@sixleaveakkm/aws-synthetics-logger-local@0.1.6"
    }
}
```

then run `npm install`

## Run Locally
### Install the script 
`npm i -g @sixleaveakkm/aws-synthetics-local@0.2.0`

It will install a command named `canary-run` in your global node environment.

### Run
Run with default, headlessMode: `false`, screenShot dir: `.screenshot`
```bash
canary-run yourScriptName.handler
```
or with parameters
```bash
canary-run --headless false --screenshotDir .screenshot yourScriptName.handler
```

which will execute your canary script

## example
[example](example/)
