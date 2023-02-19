<script setup lang="ts">
</script>

<template>
  <div class="main">
    <div class="ui-framework-list">
      <ul>
        <li>
          <router-link to="/element-ui">
            <img src="@/assets/element-ui.svg" />
          </router-link>
        </li>
      </ul>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.main ul {
  list-style: none;
}

.main .ui-framework-list {
  flex-shrink: 0;
}

.main .content {
  flex-grow: 1;
}
</style>
