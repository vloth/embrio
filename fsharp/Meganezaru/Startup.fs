namespace Meganezaru

open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting

type Startup private () =

    new (configuration: IConfiguration) as __ =
        Startup () then
        __.Configuration <- configuration

    member __.ConfigureServices(services: IServiceCollection) =
        services.AddSignalR () |> ignore
        services.AddControllers () |> ignore

    member __.Configure(app: IApplicationBuilder, env: IWebHostEnvironment) =
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
            endpoints.MapHub<EventHub> "/hub" |> ignore
            ) |> ignore

    member val Configuration : IConfiguration = null with get, set