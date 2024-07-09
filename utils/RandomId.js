export function RandomId(){
    return Math.random().toString(36).substring(2, 9);
}

export function ToMegabyte(filesize){
    return (filesize / (1024*1024)).toFixed(2);
}

export function getExtension(url){
    return url.substring(url.lastIndexOf('.') + 1);
}