<template>
  <div class="main">
    <div class="test-unit-list">
      <el-menu
          :router="true"
          :default-active="basePath + routes[0].path">
        <el-menu-item :key="i.path" v-for="i in routes" :index="basePath + i.path">
          <i class="el-icon-setting"></i>
          <span slot="title">{{ i.meta ? i.meta.name : "" }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import type {RouteConfig} from "vue-router/types/router";

@Component({
  name: "Example"
})
export default class Example extends Vue {
  basePath: string = "/element-ui/";

  routes: ((RouteConfig & { meta: { name: string } }) | RouteConfig)[] = [];

  constructor() {
    super();

    if (this.$router.options.routes && this.$router.options.routes.length) {
      const uiRoutes: RouteConfig = this.$router.options.routes[0];
      if (uiRoutes && Array.isArray(uiRoutes.children)) {
        const frameworkRoutes: RouteConfig[] = uiRoutes.children || [];
        const unitsConfig = frameworkRoutes.find(i => i.path.indexOf("element-ui") >= 0);
        if (unitsConfig) {
          this.routes = unitsConfig.children || [];
        }
      }
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.main .test-unit-list {
  width: 150px;
  height: 100%;
  flex-shrink: 0;
}

.main .content {
  flex-grow: 1;
  margin: 0 20px;
}
</style>