using System;
using System.Net.NetworkInformation;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.IO;
using System.Diagnostics;

namespace mointoringInvoker
{
    class Program
    {

        static void Main(string[] args)
        {
            Process p = new Process();
            p.StartInfo.FileName = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe";
            p.StartInfo.Arguments = "-File \"C:\\Users\\ytymkiv001\\Desktop\\Untitled1.ps1\" WiFi \"http://tymkiv.pp.ua:3000/api/post/monitor \"";
            p.Start();
            
            
            /*




                    var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://tymkiv.pp.ua:3000/");
                    httpWebRequest.ContentType = "application/json";
                    httpWebRequest.Method = "POST";




                    HttpClient client = new HttpClient
                    {
                        BaseAddress = new Uri("http://tymkiv.pp.ua:3000/")
                    };
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    float RX = 0;
                    float TX = 0;
                    for (int i = 0; i < 1; i++)
                    {
                        long bytesStartRX = ifs.GetIPStatistics().BytesReceived;
                        long bytesStartTX = ifs.GetIPStatistics().BytesSent;
                        System.Threading.Thread.Sleep(1000);
                        long bytesEndRX = ifs.GetIPStatistics().BytesReceived;
                        long bytesEndTX = ifs.GetIPStatistics().BytesSent;
                        RX = RX + (float)(bytesEndRX - bytesStartRX);
                        TX = TX + (float)(bytesEndTX - bytesStartTX);
                        Console.WriteLine(" | ");
                    }
                    float speedRX = RX / 10000;
                    float speedTX = TX / 10000;
                    var value = new Dictionary<string, string>
                    {
                        { "rx", speedRX.ToString() },
                        { "tx", speedTX.ToString() },
                        { "name", "NAME" }
                    };
                    string payload = "{\"rx\":" + speedRX + ",\"tx\":" + speedTX + ",\"name\":" + "\"name\"" + "}";
                    var stringContent = new StringContent(payload);
                    Console.WriteLine(payload);

                    using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                    {
                        streamWriter.Write(stringContent);
                    }


                    var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                    using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                    {
                        var result = streamReader.ReadToEnd();
                        Console.WriteLine(result);
                    }

                    /*    Console.WriteLine(stringContent.ReadAsStringAsync());
                    //var respone = await client.PostAsync("", stringContent).Result;
                    var smth = await client.GetAsync("");
                    if (smth.IsSuccessStatusCode)
                    {
                        Console.WriteLine(smth.StatusCode);
                    } else
                    {
                        Console.WriteLine("Error");
                    } 
                    Console.WriteLine(speedRX + " | " + speedTX); */
                
            
        }
    }
}
