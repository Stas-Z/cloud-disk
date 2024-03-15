import config from 'config'

import { AppConfig } from '../../../config/default'

export const appConfig: AppConfig = {
    serverPort: config.get<number>('serverPort'),
    dbUrl: config.get<string>('dbUrl'),
    secretKey: config.get<string>('secretKey'),
    filePath: config.get<string>('filePath'),
}
