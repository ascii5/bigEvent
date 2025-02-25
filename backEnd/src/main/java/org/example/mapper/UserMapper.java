package org.example.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.example.pojo.User;

@Mapper
public interface UserMapper {

    @Select("select * from user where username = #{username}")
    public User findByUserName(String username);

    @Select("insert into user(username,password,create_time,update_time)" +
    " values(#{username},#{password},now(),now())"
    )
    public void add(String username, String password);

    @Select("update user set nickname=#{nickname},email=#{email},update_time=#{updateTime} where id = #{id}")
    void update(User user);

    @Select("update user set user_pic=#{avatarUrl},update_time=now() where id = #{id}")
    void updateAvatar(String avatarUrl,Integer id);

    @Select("update user set password=#{newPwd},update_time = now() where id = #{id}")
    void updatePwd(String newPwd,Integer id);
}
