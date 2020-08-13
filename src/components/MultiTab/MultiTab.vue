<script>
import events from './events'
import { mapGetters, mapState } from 'vuex'
import { TAB_TAG, TAB_TAG_REMOVE, TAB_TAG_REMOVE_ALL, TAB_TAG_REMOVE_OTHER } from '@/store/mutation-types'
export default {
  name: 'MultiTab',
  data () {
    return {
      fullPathList: [],
      pages: [],
      activeKey: '',
      newTabIndex: 0
    }
  },
  computed: {
    ...mapGetters(['tag', 'tagList']),
    ...mapState({
      tag: state => state.tab.tag
    })
  },
  created () {
    // bind event
    events.$on('open', val => {
      if (!val) {
        throw new Error(`multi-tab: open tab ${val} err`)
      }
      this.activeKey = val
    }).$on('close', val => {
      if (!val) {
        this.closeThat(this.activeKey)
        return
      }
      this.closeThat(val)
    }).$on('rename', ({ key, name }) => {
      try {
        const item = this.pages.find(item => item.path === key)
        item.meta.customTitle = name
        this.$forceUpdate()
      } catch (e) {
      }
    })
    this.addTag(this.$route)
    this.selectedLastPath()
  },
  methods: {
    findTag (value) {
      let tag, key
      this.tagList.map((item, index) => {
        if (item.fullPath === value) {
          tag = item
          key = index
        }
      })
      return { tag: tag, key: key }
    },
    onEdit (targetKey, action) {
      this[action](targetKey)
    },
    remove (targetKey) {
      let { tag, key } = this.findTag(targetKey)
      this.$store.commit(TAB_TAG_REMOVE, tag)
      if (tag.fullPath === this.tag.fullPath) {
        // 如果关闭本标签让前推一个
        tag = this.tagList[key === 0 ? key : key - 1]
        this.activeKey = tag.fullPath
      }
    },
    selectedLastPath () {
      this.activeKey = this.tag.fullPath
    },

    // content menu
    closeThat (e) {
      this.remove(e)
    },
    closeOther (e) {
      this.$store.commit(TAB_TAG_REMOVE_OTHER)
    },

    closeAll (e) {
      this.$store.commit(TAB_TAG_REMOVE_ALL)
    },
    closeMenuClick (key, route) {
      this[key](route)
    },
    addTag (action) {
      this.$store.commit(TAB_TAG, {
        fullPath: action.fullPath,
        path: action.path,
        meta: action.meta,
        params: action.params
      })
    },
    renderTabPaneMenu (e) {
      return (
        <a-menu {...{ on: { click: ({ key, item, domEvent }) => { this.closeMenuClick(key, e) } } }}>
          <a-menu-item key="closeThat">关闭当前标签</a-menu-item>
          <a-menu-item key="closeOther">关闭其它</a-menu-item>
          <a-menu-item key="closeAll">关闭全部</a-menu-item>
        </a-menu>
      )
    },
    // render
    renderTabPane (title, keyPath) {
      const menu = this.renderTabPaneMenu(keyPath)

      return (
        <a-dropdown overlay={menu} trigger={['contextmenu']}>
          <span style={{ userSelect: 'none' }}>{ title }</span>
        </a-dropdown>
      )
    }
  },
  watch: {
    '$route': function (newVal) {
      this.addTag(newVal)
    },
    tag () {
      this.activeKey = this.tag.fullPath
      // this.$router.push({ path: this.tag.fullPath })
    },
    activeKey: function (newPathKey) {
      this.$router.push({ path: newPathKey })
    }
  },
  render () {
    const { onEdit } = this
    const panes = this.tagList.map(page => {
      return (
        <a-tab-pane
          style={{ height: 0 }}
          tab={this.renderTabPane(page.meta.title, page.fullPath)}
          key={page.fullPath} closable={page.close}
        >
        </a-tab-pane>)
    })

    return (
      <div class="ant-pro-multi-tab">
        <div class="ant-pro-multi-tab-wrapper">
          <a-tabs
            hideAdd
            type={'editable-card'}
            v-model={ this.activeKey }
            tabBarStyle={{ background: '#FFF', margin: 0, paddingLeft: '16px', paddingTop: '1px' }}
            {...{ on: { edit: onEdit } }}>
            {panes}
            <a-dropdown slot="tabBarExtraContent">
              <a-menu
                slot="overlay"
                {...{ on: { click: ({ key, item, domEvent }) => { this.closeMenuClick(key, item) } } }}
              >
                <a-menu-item key="closeOther">关闭其它</a-menu-item>
                <a-menu-item key="closeAll">关闭所有</a-menu-item>
              </a-menu>
              <a-button class="nav-tab-drop" type="primary">
                更多 <a-icon type="down"/>
              </a-button>
            </a-dropdown>
          </a-tabs>
        </div>
      </div>
    )
  }
}
</script>
