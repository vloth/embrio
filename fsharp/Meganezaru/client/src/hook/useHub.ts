import { HttpTransportType, HubConnectionBuilder } from '@aspnet/signalr'
import { createConnectionContext } from '@hwdtech/react-signalr'

const namespace = 'http://localhost:5000'

export const HubContext = createConnectionContext(() =>
  new HubConnectionBuilder()
    .withUrl(`${namespace}/hub`, HttpTransportType.WebSockets)
    .build()
)
