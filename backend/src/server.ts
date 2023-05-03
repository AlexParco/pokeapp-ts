import { type Application } from 'express'

export class Server {
  public app: Application

  constructor (app: Application) {
    this.app = app
  }

  init (): void {
    this.app.listen(4505, () => {
      console.log('Server is running')
    })
  }
}
