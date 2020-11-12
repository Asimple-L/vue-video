<template>
    <el-row class="center">
      <el-col :span="24">
        <div class="pricing">
          <ul>
            <li class="unit price-primary">
              <div class="price-title">
                <h3>目录管理</h3>
              </div>
              <div class="price-body">
                <h4>Basic</h4>
                <p>Lots of clients &amp; users</p>
                <ul>
                  <li>250 SKU's</li>
                  <li>1 GB Storage</li>
                  <li>3,5% transaction fee</li>
                </ul>
              </div>
              <div class="price-foot">
                <router-link :to="{ name: 'catalog-manager' }">
                  <button type="button" class="btn btn-primary">前去目录管理</button>
                </router-link>
              </div>
            </li>
            <li class="unit price-success active">
              <div class="price-title">
                <h3>影音管理</h3>
              </div>
              <div class="price-body">
                <h4>Premium</h4>
                <p>Lots of clients &amp; users</p>
                <ul>
                  <li>2500 SKU's</li>
                  <li>5 GB Storage</li>
                  <li>1,5% transaction fee</li>
                </ul>
              </div>
              <div class="price-foot">
                <router-link :to="{ name: 'film-manager' }">
                  <button type="button" class="btn btn-success">前去影音管理</button>
                </router-link>
              </div>
            </li>
            <li class="unit price-warning">
              <div class="price-title">
                <h3>账户管理</h3>
              </div>
              <div class="price-body">
                <h4>Unlimited</h4>
                <p>Lots of clients &amp; users</p>
                <ul>
                  <li>Unlimited SKU's</li>
                  <li>20 GB Storage</li>
                  <li>1% transaction fee</li>
                </ul>
              </div>
              <div class="price-foot">
                <router-link :to="{ name: 'user-manager' }">
                  <button type="button" class="btn btn-warning">前去账户管理</button>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'manager-index'
}
</script>

<style scoped>
  @import "../../assets/css/index.css";
  @import "../../assets/css/manager/index.css";
</style>
