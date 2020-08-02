namespace Meganezaru.Controllers

open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Logging
open Microsoft.AspNetCore.SignalR
open Meganezaru

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