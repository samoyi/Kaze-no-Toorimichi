
const fn_index = async (ctx, next) => {
    ctx.response.body = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="keywords" content="風の通り道 日本自然文化">
            <meta name="description" content="以日本自然文化为主题的各类作品及艺术实体的资料库">
            <title>風の通り道</title>
      </head>
      <body>
          <h1>風の通り道</h1>
          <form>
              <input type="text" placeholder="输入你感兴趣的主题。例如：富士山"
                  required="required" size="36" />
              <input type="submit" value="搜索相关条目" />
          </form>
      </body>
    </html>
    `;
};

module.exports = {
    'GET /': fn_index,
};
