
namespace Meganezaru

open System.Threading.Tasks;
open Microsoft.AspNetCore.SignalR

type IEventHubClient =
    abstract member ReceiveEvent : event:string -> Task

type EventHub() =
   inherit Hub<IEventHubClient>()

   member __.SendEvent(event: string) =
       __.Clients.Others.ReceiveEvent event