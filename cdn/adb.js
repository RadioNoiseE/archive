if (/^https?:\/\/app\.bilibili\.com\/x\/v2\/splash\/list/.test($request.url)) {
    try {
        let object = JSON.parse($response.body);
        object.data.max_time = 0;
        object.data.min_interval = 31536000;
        object.data.pull_interval = 31536000;
        object.data.list.show = [];
        for (let index = 0; index < object.data.list.length; index++) {
            let item = object.data.list[index];
            item.duration = 0;
            item.begin_time = 1915027200;
            item.end_time = 1924272000;
        }
        $done({ body: JSON.stringify(object) });
    } catch (error) {
        $done($response);
    }
} else { $done($response); }
