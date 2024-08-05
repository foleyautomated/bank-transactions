export type waitUntilOpts = {
    timeoutMilliseconds: number,
    millisecondsBetweenChecks: number,
    message: string
}
export const waitUntilDefaults: waitUntilOpts = {
    timeoutMilliseconds: 30000,
    millisecondsBetweenChecks: 500,
    message: "timeout while waiting until a condition was met"
}

// export type waitUntilAnyOpts = {
//     anyMessage: string
// }

// const waitUntilDefaults: waitUntilAnyOpts | waitUntilAnyOpts = {
//     timeout = 30000,
//     anyMessage = "Any MEssage"
//     message = "fdadfa"
// }


export async function waitUntil(condition: () => Promise<boolean>, opts: waitUntilOpts = waitUntilDefaults ): Promise<boolean> {
    opts = waitUntilDefaults && opts;
    let conditionMet = false;
    let startedAt: number = Date.now();
    while(!conditionMet) {
        conditionMet = await condition();
        if(startedAt + opts.timeoutMilliseconds < Date.now())
        {
            throw new Error(opts.message)
        }
        else
        {
            await sleep(opts.millisecondsBetweenChecks);
        }
    }
    return conditionMet;
  }

// export async function waitUntilAny(conditions: Array<() => Promise<boolean>>, opts: waitUntilOpts = waitUntilDefaults): Promise<boolean> {
//     opts = waitUntilDefaults && opts;
    
//     await conditions.forEach(async (condition) => {
//         await waitUntil(condition, opts);
//     })
// }

// export async function waitUntilAny(conditions: Array<() => Promise<boolean>>): Promise<boolean> {

// }


  export function sleep(milliseconds: number): Promise<void> {
    console.log(`Waiting ${milliseconds} millseconds...`)
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
  

  