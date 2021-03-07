<template>
    <div>
        <button @click="sendRepeate">重复发送</button>
        <button @click="send">发送</button>
        <button @click="cancel">取消</button>
        <a href="http://localhost:8081/test.txt" download="test.txt">下载</a>
        <div><button @click="downLoad">下载</button></div>
    </div>
</template>
<script>
import {axiosGet, downLoadFetch} from '../util/request';
import Axios from 'axios';
export default {
    name: 'AxiosDemo',
    mounted(){
        
    },
    data(){
        return {
            source: null
        }
    },
    methods: {
        downLoad(){
            //http://localhost:8081/aip/downFile
            //getFile
            downLoadFetch("http://localhost:8081/api/downFile").then(res=>{
                console.log(res);
            })
        },
        sendRepeate(){
            axiosGet("http://localhost:8081/api/getCount", {current: 1, size: 10}).then(res=>{
                console.log(res);
            }, error=>{
                console.log(error);
            })    
        },
        send(){
            this.source = Axios.CancelToken.source();
            axiosGet("http://localhost:8081/api/famousInfo", {}, {
                cancelToken: this.source.token,
                source: this.source
            }).then(res=>{
                console.log(res);
            }, error=>{
                console.log(error);
            })
        },
        cancel(){
            this.source.cancel("用户取消");
        }
    }
}
</script>