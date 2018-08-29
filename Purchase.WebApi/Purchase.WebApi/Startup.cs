using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Purchase.BusinessLogic.Contracts;
using Purchase.BusinessLogic.Services;
using Purchase.DataAccess;
using Purchase.DataAccess.Contracts;
using Purchase.DataAccess.Oracle;
using Purchase.DataAccess.Repositories;
using Purchase.DataAccess.Utils;

namespace Purchase.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            ConfigureDataAccess(services);
            ConfigureBusinessLogic(services);
        }

        private void ConfigureDataAccess(IServiceCollection services)
        {
            DefaultTypeMap.MatchNamesWithUnderscores = true;

            services.AddTransient<IConnectionStringProvider, DefaultConnectionStringProvider>();

            services.AddTransient<IPurchaseRepository, PurchaseRepository>();
            services.AddTransient<IPurchasePositionRepository, PurchasePositionRepository>();

            services.AddTransient<IDbConnectionFactory, OracleDbConnectionFactory>();

            var sp = services.BuildServiceProvider();
            var config = sp.GetService<IConfigurationRoot>();

        }

        private void ConfigureBusinessLogic(IServiceCollection services)
        {
            services.AddTransient<IPurchaseService, PurchaseService>();
            services.AddTransient<IPurchasePositionService, PurchasePositionService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            //app.UseCors("AllowAllOrigins");
            app.UseCors(builder =>
            {
                builder.AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin()
                .AllowCredentials();
            });

            /*app.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder.AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin()
                    .AllowCredentials();
                });
            });*/


            //app.UseCors("CorsPolicy");

            app.Use((context, next) =>
            {
                context.Response.Headers["Access-Control-Allow-Origin"] = "*";
                return next.Invoke();
            });

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
