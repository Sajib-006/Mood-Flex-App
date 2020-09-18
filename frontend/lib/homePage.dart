import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
//import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'dart:convert' show json, base64, ascii;
import 'placeholder.dart';
import 'profile.dart';

const SERVER_IP = 'http://192.168.43.58:7000/api';
final storage = FlutterSecureStorage();

class HomePage extends StatefulWidget {
  //HomePage(this.jwt, this.payload);
  HomePage(this.jwt);
  // factory HomePage.fromBase64(String jwt) =>
  //     HomePage(
  //         jwt,
  //         json.decode(
  //             ascii.decode(
  //                 base64.decode(base64.normalize(jwt.split(".")[1]))
  //             )
  //         )
  //     );

  final String jwt;

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _currentIndex = 0;
  List<Widget> _children;
  //static String jwt ;
  //print(widget.jwt);
  //_HomePageState();
  @override
  void initState() {
    super.initState();
    _children = [
      PlaceholderWidget(Colors.white),
      PlaceholderWidget(Colors.deepOrange),
      PlaceholderWidget(Colors.green),
      PlaceholderWidget(Colors.blue),
      Profile(widget.jwt),
      //PlaceholderWidget(Colors.green),


    ];
  }


  //String get jwt => jwt;
  //_children.add();
  void onTabTapped(int index) {
    setState(() {
      print(index);
      _currentIndex = index;
    });
  }
  @override
  Widget build(BuildContext context) =>
      Scaffold(
        appBar: AppBar(
            title: Text("Mood Flex"),
            centerTitle: true,
          backgroundColor: Colors.grey[800],
        ),
        body: //(_currentIndex !=2)? _children[_currentIndex]: Profile(widget.jwt),
        _children[_currentIndex],

        bottomNavigationBar: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
         // backgroundColor: Colors.red,
          selectedItemColor: Colors.amber[800],
          onTap: onTabTapped, // new
          currentIndex: _currentIndex,
          items: [
            BottomNavigationBarItem(
              icon: new Icon(Icons.event),
              title: new Text('Calendar'),
            ),
            BottomNavigationBarItem(
              icon: new Icon(Icons.receipt),
              title: new Text('Journal'),
            ),
            BottomNavigationBarItem(
                icon: Icon(Icons.search),
                title: Text('Explore'),
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.timer),
              title: Text('Notifications'),
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person),
              title: Text('Profile'),
            )
          ],

        ),
      );
}