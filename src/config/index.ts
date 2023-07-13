import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT || 5000,
  db_uri: process.env.DB_URI as string,
  node_env: process.env.NODE_ENV || 'development',
  sault_round: (Number(process.env.SAULT_ROUND) as number) || 12,
  token: {
    refresh_token_time: process.env.REFRESH_TOKEN_TIME as string,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET as string,
    access_token_time: process.env.ACCESS_TOKEN_TIME as string,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET as string,
  },
}
