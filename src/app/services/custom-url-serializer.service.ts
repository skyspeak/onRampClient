import { Injectable } from '@angular/core';
import {UrlSerializer, UrlTree, DefaultUrlSerializer} from '@angular/router';

@Injectable()
export class CustomUrlSerializerService implements UrlSerializer {

 parse(url: any): UrlTree {
        let dus = new DefaultUrlSerializer();
        return dus.parse(url);
    }

    serialize(tree: UrlTree): any {
        let dus = new DefaultUrlSerializer(),
            path = dus.serialize(tree);
        // use your regex to replace as per your requirement.
        return path.replace(/%2B/g,'+').replace(/%2F/g,'/').replace(/%3D/g,'=');
    }
}





