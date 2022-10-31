package site.my.planet.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {

    private final UserDetailServiceCustom userDetail;

    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Bean
    public JWTFilter jwtFilter() {
        return new JWTFilter();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public WebSecurity(UserDetailServiceCustom userDetail) {
        this.userDetail = userDetail;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetail).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeHttpRequests()
                .antMatchers(HttpMethod.POST, "/login").permitAll()
                //
                .antMatchers(HttpMethod.GET, "/usuario").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.GET, "/usuario/{id}").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.POST, "/usuario").permitAll()
                .antMatchers(HttpMethod.PUT, "/usuario/{id}").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.DELETE, "/usuario/{id}").hasAnyAuthority("u", "a")
                //
                .antMatchers(HttpMethod.GET, "/pacote").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.GET, "/pacote/{id}").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.POST, "/pacote").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.PUT, "/pacote/{id}").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.DELETE, "/pacote/{id}").hasAnyAuthority("u", "a")
                //
                .antMatchers(HttpMethod.GET, "/projeto").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.GET, "/projeto/{id}").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.POST, "/projeto").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.PUT, "/projeto/{id}").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.DELETE, "/projeto/{id}").hasAnyAuthority("u", "a")
                //
                .anyRequest().authenticated()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(this.jwtFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;
    }
}
