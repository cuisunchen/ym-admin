<template>

  <!-- 顶部的内容: 今日新增用户人数 / 平台总人数 / 平台几日收益 / 平台总收益  -->
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!(this.roles.includes('admin') || this.roles.includes('root'))) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
