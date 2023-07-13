import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT || 5000,
  db_uri: process.env.DB_URI as string,
  node_env: process.env.NODE_ENV || 'development',
}
