const sqlConfig = {
    server: "sqlservercentralpublic.database.windows.net",
    user: process.env.DBUSERNAME,
    //user: 'sqlfamily'
    password: process.env.PASSWORD,
    //password: 'sqlf@m1ly'
    database: process.env.DATABASE,

    pool: {
    idleTimeoutMillis: 60000
    },
    options:{
    encrypted: true, // for azure
    trustServerCertificate: false,
    useUTC: true
    }
    }
    module.exports = sqlConfig;