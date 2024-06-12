<template>
  <div>
    <el-container>
      <el-header class="bg-dark-50 [&>div>a>div>span]:text-main-primary-200 !px-0">
        <DefaultHeader />
      </el-header>
      <el-main class="!px-0 !py-0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
