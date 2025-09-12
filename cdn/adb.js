(() => {
    if ($response?.body && /^https?:\/\/app\.bilibili\.com\/x\/v2\/splash\/list/.test($request.url)) {
        try {
            let object = JSON.parse($response.body);
            object.data = {
                ...object.data,
                max_time: 0,
                min_interval: 31536000,
                pull_interval: 31536000,
                list: object.data.list?.map(item => ({
                    ...item,
                    duration: 0,
                    begin_time: 1915027200,
                    end_time: 1924272000,
                    show: []
                })) || []
            };
            $done({ body: JSON.stringify(object) });
        } catch (error) {
            console.log("Splash removal error:", error);
            $done();
        }
    } else { $done(); }
})();
