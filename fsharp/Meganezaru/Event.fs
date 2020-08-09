namespace Meganezaru.Hub

open System.Threading.Tasks;
open Microsoft.AspNetCore.SignalR

type IEventHubClient =
    abstract member ReceiveEvent : event:string -> Task

type EventHub() =
   inherit Hub<IEventHubClient>()

   member __.SendEvent(event: string) =
       __.Clients.Others.ReceiveEvent event

namespace Meganezaru.Controllers

open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Logging
open Microsoft.AspNetCore.SignalR
open Meganezaru.Hub

module ActionResult =
    let ofAsync (res: Async<IActionResult>) =
        res |> Async.StartAsTask

[<ApiController>]
[<Route("api/[controller]")>]
type EventController (logger : ILogger<EventController>,
    hub: IHubContext<EventHub, IEventHubClient>) =
    inherit ControllerBase()

    [<HttpGet("{event}")>]
    member __.Get(event) =
        ActionResult.ofAsync <| async {
            do! hub.Clients.All.ReceiveEvent event |> Async.AwaitTask
            let msg = sprintf "event %s broadcasted successfully" event
            return __.Ok msg :> _ }