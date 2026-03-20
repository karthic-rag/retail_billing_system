package com.software.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    private final CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull  HttpServletResponse response,
            @NonNull  FilterChain chain) throws ServletException, IOException
    {
        if(request.getServletPath().startsWith("/auth")){
            chain.doFilter(request,response);
            return;
        }

        String header = request.getHeader("Authorization");

        if(header != null && header.startsWith("Bearer ") &&
                SecurityContextHolder.getContext().getAuthentication() == null){

            String token = header.substring(7);

            try{
                String username = jwtUtil.extractUsername(token);

                UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            catch (Exception e){
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                logger.error("Cannot set user authentication: {Invalid token provided}", e);
                return;
            }
        }

        chain.doFilter(request, response);
    }
}
