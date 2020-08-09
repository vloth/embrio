namespace Meganezaru

open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting
open Microsoft.Extensions.Logging;
open Microsoft.AspNetCore.Hosting.Server.Features

type Startup private () =

    new (configuration: IConfiguration) as __ =
        Startup () then
        __.Configuration <- configuration

    member __.ConfigureServices(services: IServiceCollection) =
        services.AddSignalR () |> ignore
        services.AddControllers () |> ignore
        services.AddLogging (fun b ->
               b.AddFilter("Microsoft", LogLevel.Warning)
                .AddConsole() |> ignore) |> ignore

    member __.Configure(app: IApplicationBuilder,
        env: IWebHostEnvironment,
        lifetime: IHostApplicationLifetime) =
        if (env.IsDevelopment()) then
            app.UseDeveloperExceptionPage () |> ignore

        app.UseDefaultFiles() |> ignore
        app.UseStaticFiles() |> ignore
        app.UseCors(fun b -> b.AllowAnyMethod().AllowAnyHeader()
                              .WithOrigins("http://localhost:3000", "http://localhost:3000").AllowCredentials() |> ignore
            ) |> ignore
        
        app.UseRouting () |> ignore
        app.UseAuthorization () |> ignore

        app.UseEndpoints(fun endpoints ->
            endpoints.MapControllers () |> ignore
            endpoints.MapHub<Hub.EventHub> "/hub" |> ignore
            ) |> ignore

        lifetime.ApplicationStarted.Register(fun () -> 
                                            let addresses = app.ServerFeatures.Get<IServerAddressesFeature>()
                                            let urls = addresses.Addresses |> String.concat ", "
                                            printfn "Application started at: %s" urls
                                            ) |> ignore

    member val Configuration : IConfiguration = null with get, set