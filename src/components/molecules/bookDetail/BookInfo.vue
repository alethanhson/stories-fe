<template>
  <main class="flex gap-10">
    <div class="flex-1">
      <img
        src="https://cdnntx.com/nettruyen/thumb/ban-trai-cu-la-quy-hut-mau-dung-treu-toi.jpg"
        alt=""
        class="w-full"
      />
    </div>

    <div class="flex-[3] gap-4 flex flex-col">
      <table class="w-full [&>tbody>tr>td]:p-2 [&>tbody>tr>td:first-child]:w-1/4">
        <tbody>
          <tr>
            <td>Author</td>
            <td>Lê Công Anh</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>Active</td>
          </tr>
          <tr>
            <td>Genre</td>
            <td>Oke</td>
          </tr>
          <tr>
            <td>Likes</td>
            <td>123</td>
          </tr>
        </tbody>
      </table>

      <div class="flex gap-5 items-center">
        <el-button type="primary">Follow</el-button>
        <p><span>4</span> Followers</p>
      </div>

      <div>
        <el-button type="primary" class="!bg-main-primary-200 hover:!bg-main-primary-400">
          Read Beginning
        </el-button>
        <el-button type="primary" class="!bg-main-primary-200 hover:!bg-main-primary-400">
          Read Latest
        </el-button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style></style>
