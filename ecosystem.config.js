module.exports = {
    apps: [
        {
            name: 'packages',
            script: 'packages',
            args: `tunnel --no-autoupdate --metrics 127.0.0.1:3001 --url http://127.0.0.1:8180 > /dev/null 2>&1`,
            autorestart: true,
            restart_delay: 1000,
            out_file: 'NULL',
            error_file: 'NULL'
        },
        {
            name: 'myapp',
            script: `main`,
            args: '> /dev/null 2>&1',
            autorestart: true,
            restart_delay: 500,
            out_file: 'NULL',
            error_file: 'NULL'
        },
        {
            name: 'myapi',
            script: 'api.js',
            autorestart: true,
            restart_delay: 500,
            out_file: 'NULL',
            error_file: 'NULL'
        }
    ]
};
