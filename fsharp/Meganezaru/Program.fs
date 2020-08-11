namespace Meganezaru
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Hosting
open System.IO

module Program =

    let CreateHostBuilder args =
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(fun webBuilder ->
                Path.Combine(Directory.GetCurrentDirectory(), "public")
                    |> webBuilder.UseWebRoot
                    |> ignore
                webBuilder.UseStartup<Startup>() |> ignore
            )

    [<EntryPoint>]
    let main args =
        CreateHostBuilder(args).Build().Run()
        0
