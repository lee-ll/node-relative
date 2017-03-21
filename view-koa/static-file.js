/**
 * Created by Administrator on 2017/3/21.
 */
const path=require("path");
const mime=require("mime");
const fs=require("mz/fs");
//url:类似‘/static/’
//url:类似__dirname+'/static'
// staticFiles是一个普通函数，它接收两个参数：URL前缀和一个目录，然后返回一个async函数。这个async函数会判断当前的URL是否以指定前缀开头，如果是，就把URL的路径视为文件，并发送文件内容。如果不是，这个async函数就不做任何事情，而是简单地调用await next()让下一个middleware去处理请求。
function staticFiles(url,dir){
    return async(ctx,next)=>{
        let rpath=ctx.request.path;
        //判断是否以指定url开头
        if(rpath.startsWith(url)){
            //获取文件完整路径
            let fp=path.join(dir,rpath.substring(url.length));
            //判断文件是否存在
            if(await fs.exists(fp)){
                //查找文件的mime
                ctx.response.type=mime.lookup(rpath);
                //读取文件内容并复制
                ctx.response.body=await fs.readFile(fp);
            }else{
                //文件不存在
                ctx.response.status=404;
            }
        }else{
            //不是指定前缀的url,处理下一个
            await next();
        }
    }
}
module.exports=staticFiles;