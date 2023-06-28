# Alerts

Look into pulling alerts via Chrome extension (look at FIO for websocket code). These could then be turned into desktop or phone notifications.

## Websocket Message

Just an example of a single COMEX_ORDER_FILLED alert.

```
["event",{"messageType":"ALERTS_ALERT","payload":{"id":"19a6fb9cb5a5041e9939e150744b9a07","type":"COMEX_ORDER_FILLED","naturalId":"0941337b80d51134fb4a0b889adb40e7","time":{"timestamp":1687928725064},"data":[{"key":"commodity","value":"basicBulkhead"},{"key":"exchange","value":{"id":"428b9f5cf86d62bbb29f9485f10a88d3","name":"Hortus Station Commodity Exchange","code":"IC1","_type":"commodity-exchange","_proxy_key":"428b9f5cf86d62bbb29f9485f10a88d3"}}],"seen":false,"read":false}}]
```
