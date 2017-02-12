<template>
    <div >
        <el-menu theme="dark" default-active="1" class="el-menu-demo" router mode="horizontal" @select="handleSelect">
            <el-menu-item index="model">模型管理</el-menu-item>
            <el-menu-item index="rule">规则管理</el-menu-item>
            <el-menu-item index="vari">变量管理</el-menu-item>
        </el-menu>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default{
        data (){
            return {};
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .content {
        background-color: aliceblue;
    }
    .el-menu-demo{

    }
</style>