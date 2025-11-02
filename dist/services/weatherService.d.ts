export declare const getWeatherData: (lat: number, lon: number, cityName?: string, country?: string) => Promise<{
    location: {
        city: any;
        country: any;
    };
    current: {
        temperature: any;
        humidity: any;
        condition: any;
        wind_speed: any;
        icon: any;
    };
}>;
export declare const getHourlyWeatherData: (lat: number, lon: number, cityName?: string, country?: string) => Promise<{
    city: string | undefined;
    country: string | undefined;
    hourly: any;
}>;
//# sourceMappingURL=weatherService.d.ts.map