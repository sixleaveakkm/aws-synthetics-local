import { Page } from 'puppeteer-core/lib/esm/puppeteer/common/Page'

export function setLogLevel( l: 0 | 1 | 2 | 3 )

export function getLogLevel(): 0 | 1 | 2 | 3

export function addUserAgent(page: Page, userAgentString: string): Promise<void>

export function executeStep(stepName : null | string, functionToExecute: Function): Promise<void>

export function getPage(): Promise<Page>

/**
 * @description not implement yet
 */
export function getRequestResponseLogHelper(): RequestResponseLogHelper

/**
 * @description not implement yet
 * @param helper
 */
export function setRequestResponseLogHelper(helper: RequestResponseLogHelper)

/**
 * @description not implement yet
 */
export class RequestResponseLogHelper {

}

/**
 * @description this function is only supported after `syn-nodejs-2.0-beta`
 * @param stepName
 * @param suffix
 */
export function takeScreenshot(stepName: string, suffix: string): Promise<void>

/**
 * @function start
 * @description this function is not export by Synthetics
 * @param headlessMode
 * @param screenshotDir
 */
export function start(headlessMode: boolean, screenshotDir: string)

/**
 * @description this function is not export by Synthetics
 */
export function close()
