
export function formattedTime(seconds: number): string
{
    return ((Math.trunc(seconds/60)).toString()).padStart(2, "0")+":"+((seconds%60).toString()).padStart(2,"0");
}

export function percentage(limit: number, part: number): string
{
    return (Math.round(((limit-part)/limit)*10000)/100).toString()+"%";
}
