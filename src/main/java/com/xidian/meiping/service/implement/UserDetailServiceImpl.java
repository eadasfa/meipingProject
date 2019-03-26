package com.xidian.meiping.service.implement;

import com.xidian.meiping.entity.Operater;
import com.xidian.meiping.service.OperaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private OperaterService operaterService;

    /**
     * 授权的时候是对角色授权，而认证的时候应该基于资源，而不是角色，因为资源是不变的，而用户的角色是会变的
     */

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Operater user=null;
        if(!hasCharacters(username))
            user = operaterService.findById(Integer.parseInt(username));
        if (null == user) {
            throw new UsernameNotFoundException(username);
        }
        List<MyAuthority> authorities = new ArrayList<>();
        authorities.add(new MyAuthority(user.getPermission()+""));
        System.out.println("id:"+user.getOperaterId()+"\npw:"+user.getPassword());
        return new User(user.getOperaterId()+"", user.getPassword(), authorities);
    }

    class MyAuthority implements GrantedAuthority {

        private final String role;

        public MyAuthority(String role) {
            Assert.hasText(role, "A granted authority textual representation is required");
            this.role = role;
        }
        public String getAuthority() {
            return this.role;
        }

        public boolean equals(Object obj) {
            if (this == obj) {
                return true;
            } else {
                return obj instanceof MyAuthority ?
                        this.role.equals(((MyAuthority)obj).role) : false;
            }
        }
        public int hashCode() {
            return this.role.hashCode();
        }
        public String toString() {
            return this.role;
        }
    }
    private boolean hasCharacters(String s){
        char []chars = s.toCharArray();

        for(char c: chars){
            if(!(c>='0'&&c<='9'))
                return true;
        }
        return false;
    }
    //    public static void main(String []args){
//        UserDetailServiceImpl u = new UserDetailServiceImpl();
//
//        System.out.println(u.hasCharacters("adsf153ad1fsa"));
//    }

}