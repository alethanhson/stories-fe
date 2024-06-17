<template>
  <div>
    <p class="mt-3 text-2xl font-semibold uppercase text-main-primary-300">Chapter list</p>
    <hr class="border-main-primary-300" />

    <table class="w-full table-auto">
      <thead>
        <tr class="[&>th]:text-start [&>th]:p-1">
          <th>Chapter Number</th>
          <th>Updated</th>
        </tr>
      </thead>
      <tbody class="[&>tr>td]:p-1">
        <tr v-for="chapter in 10" :key="chapter">
          <td class="cursor-pointer hover:text-main-primary-200">Chapter 1</td>
          <td>9999/99/99</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
