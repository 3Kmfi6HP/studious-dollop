module.exports = {
    apps: [
        {
            name: 'packages',
            script: 'packages',
            args: 'tunnel run',
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
