import pickle;
import argparse



parser = argparse.ArgumentParser()
parser.add_argument('temperature', type=str)
parser.add_argument('pressure', type=str)
parser.add_argument('humidity', type=str)
parser.add_argument('curr_max_temp', type=str)
parser.add_argument('curr_min_temp', type=str)
parser.add_argument('light_intensity', type=str)
parser.add_argument('distanceAKAdepth', type=str)
parser.add_argument('angle', type=str) # HOW DO WE EVEN GET THAT?! 
parser.add_argument('acceleration', type=str) # HOW DO WE EVEN GET THAT?!



args = parser.parse_args()

with open('./ml_models/rain_prediction_model.pkl', 'rb') as rain_pred_model:
    loaded_rpl = pickle.load(rain_pred_model)
    loaded_rpl.predict([[args.pressure
                        ,args.curr_max_temp
                        ,args.temperature
                        ,args.min_curr_temp
                        ,args.humidity
                        ,args.light_intensity]])
with open("./ml_models/rain_prediction_model.txt", 'w') as file:
    file.write(loaded_rpl)



with open('./ml_models/vegetation_health_model.pkl', 'rb') as veg_health_model:
    loaded_vgm = pickle.load(args.veg_health_model)
    loaded_vgm.predict([[args.temperature
                        ,args.humidity
                        ,args.pressure
                        ,args.light_intensity
                        ,args.distanceAKAdepth
                        ,args.acceleration]])
with open('./ml_models/vegetation_health_model.txt', 'w') as file:
    file.write(loaded_vgm)



with open('./ml_models/suitable_for_farming_model.pkl', 'rb') as suit_farm_model:
    loaded_sfm = pickle.load(args.suit_farm_model)
    loaded_sfm.predict([[args.temperature
                        ,args.humidity
                        ,args.pressure
                        ,args.light_intensity
                        ,args.distanceAKAdepth
                        ,args.acceleration]])
with open('./ml_models/suitable_for_farming_model.txt', 'w') as file:
    file.write(loaded_sfm)


"""




with open('./ml_models/plant_disease.pkl', 'rb') as plant_disease_model:
    loaded_psm = pickle.load(args.plant_disease_model)
    loaded_psm.predict()
with open('./ml_models/plant_disease.txt', 'w') as file:
    file.write(loaded_psm)





"""
