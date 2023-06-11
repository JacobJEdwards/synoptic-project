import BaseCache from './BaseCache'

export class FileCache extends BaseCache<string> {
  constructor() {
    super("files:")
  }
}

export default new FileCache()

