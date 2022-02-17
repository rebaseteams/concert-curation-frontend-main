/* eslint-disable @typescript-eslint/no-explicit-any */
export type chartObj = {
    type: string;
    combined: boolean;
    name: string;
    mapperFunctionName: string;
}

export type section = {
    name: string;
    description: string;
    data: Array<chartObj>
}

export type CompareDataProps = {
    functionMapper: any
    metaData: Array<section>;
    data: any
}
