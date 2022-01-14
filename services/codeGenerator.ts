import { AppRequestType } from "@models/request";
import { getHeaders } from "./request";

const toJavaScriptRequest = (request: AppRequestType): string => {
    var content = 'import fetch from "node-fetch";\n\n';
    const headers = getHeaders(request);
    content += `const headers = ${JSON.stringify(headers, null, '\t')};\n`;
    content += `const url = "${request.url}";\n\n`;

    var reqParameters: any = {
        method: request.method,
        headers: headers,
    }

    if(request.body) {
        reqParameters = {
            ...reqParameters,
            body: request.body
        }
    }

    content += `const res = await fetch(url, ${JSON.stringify(reqParameters, null, '\t')});\n\n`;

    content += `// for text response\n`;
    content += `const text = await res.text();\n\n`;

    content += `// for json response\n`;
    content += `const json = await res.json();\n\n`;

    return content
}

const toPythonRequest = (request: AppRequestType): string => {
    var content = 'import requests\nfrom requests.structures import CaseInsensitiveDict\n\n';
    const headers = getHeaders(request);
    content += 'headers = CaseInsensitiveDict()\n'
    for (const key in headers) {
        content += `\nheaders["${key}"] = "${headers[key]}"`
    }
    content += `\n\nurl = "${request.url}"\n\n`;
    if (request.body)
        content += `body = '${request.body}'\n\n`;
    content += `res = requests.${request.method.toLowerCase()}(url, headers=headers${request.body ? ', data=body' : ''})\n\n`;

    return content
}

const toCurlRequest = (request: AppRequestType): string => {
    const headers = getHeaders(request);
    var content = `curl -X ${request.method} ${request.url} `;
    for (const key in headers) {
        content += `-H "${key}: ${headers[key]}" `
    }
    if (request.body)
        content += `-d '${request.body}'`;
    return content
}


export {
    toJavaScriptRequest,
    toPythonRequest,
    toCurlRequest
}