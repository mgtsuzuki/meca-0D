copy ..\rubyapp\docker* .
copy ..\rubyapp\config\database.yml .\config
copy ..\rubyapp\.dockerignore .
copy ..\rubyapp\.gitignore .
copy ..\rubyapp\Gem* .
xcopy ..\rubyapp\.env .env\ /e /h
