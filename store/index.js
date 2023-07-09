import createPersistedState from 'vuex-persistedstate'
import { vuelloModule } from '@/store/modules/vuello-store'

export const plugins = [createPersistedState()]

export const modules = {
  vuello: vuelloModule
}
