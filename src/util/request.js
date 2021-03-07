import axios from 'axios';

const instance = axios.create({
    baseUrl: "",
    timeout: 10000,
    header: {
        'X-Custom-Header': 'foobar'
    }
});

//拦截1 请求拦截
instance.interceptors.request.use(function(config){
    //在发送请求之前做些什么
    const token = sessionStorage.getItem('token');
    if(token){
        const newConfig = {
            ...config,
            headers: {
                token: token
            }
        }
        return newConfig;
    }else{
        return config;
    }
}, function(error){
    //对请求错误做些什么
    return Promise.reject(error);
});

// 拦截2   重复请求，取消前一个请求
const promiseArr = {};
instance.interceptors.request.use(function(config){
    //在发送请求之前做些什么
    let source=null;
    if(config.cancelToken){
        // config 配置中带了 source 信息
        source = config.source;
    }else{
        const CancelToken = axios.CancelToken;
        source = CancelToken.source();
        config.cancelToken = source.token;
    }
    const currentKey = getRequestSymbol(config);
    if(promiseArr[currentKey]){
        const tmp = promiseArr[currentKey];
        tmp.cancel("取消前一个请求");
        delete promiseArr[currentKey];
        promiseArr[currentKey] = source;
    }else{
        promiseArr[currentKey] = source;
    }
    return config;

}, function(error){
    //对请求错误做些什么
    return Promise.reject(error);
});
// 根据 url、method、params 生成唯一标识，大家可以自定义自己的生成规则
function getRequestSymbol(config){
    const arr = [];
    if(config.params){
        const data = config.params;
        for(let key of Object.keys(data)){
            arr.push(key+"&"+data[key]);
        }
        arr.sort();
    }
    return config.url+config.method+arr.join("");
}

instance.interceptors.response.use(function(response){
    const currentKey = getRequestSymbol(response.config);
    delete promiseArr[currentKey];
    return response;
}, function(error){
    //对请求错误做些什么
    return Promise.reject(error);
});

// 响应拦截
instance.interceptors.response.use(function(response){
    // 401 没有登录跳转到登录页面
    if(response.data.code===401){
        window.location.href = "http://127.0.0.1:8080/#/login";
    }else if(response.data.code===403){
        // 403 无权限跳转到无权限页面
        window.location.href = "http://127.0.0.1:8080/#/noAuth";
    }
    return response;
}, function(error){
    //对请求错误做些什么
    return Promise.reject(error);
})

const defaultDownConfig = {
    responseType: 'blob',
    timeout: 10 * 60 * 1000
}


//封装下载
export function downLoadFetch(url, params = {}, config={}) {
    //取消
    const downSource = axios.CancelToken.source();
    document.getElementById('downAnimate').style.display = 'block';
    document.getElementById('cancelBtn').addEventListener('click', function(){
        downSource.cancel("用户取消下载");
        document.getElementById('downAnimate').style.display = 'none';
    }, false);
    //参数
    config.params = params;
    //超时时间
    config.timeout = config.timeout ? config.timeout : defaultDownConfig.timeout;
    //类型
    config.responseType = defaultDownConfig.responseType;
    //取消下载
    config.cancelToken = downSource.token;
    return instance.get(url, config).then(response=>{
        const content = response.data;
        const url = window.URL.createObjectURL(new Blob([content]));
        //创建 a 标签
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        //文件名  Content-Disposition: attachment; filename=download.txt
        const filename = response.headers['content-disposition'].split(";")[1].split("=")[1];
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        document.getElementById('downAnimate').style.display = 'none';
        return {
            status: 200
        }
    })
}


export function axiosGet(url, params={}, config={}){
    config.params = params;
    return instance.get(url, config);
}

