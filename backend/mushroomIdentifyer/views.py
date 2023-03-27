from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MushroomSerializer
from .models import Mushroom
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from fastai.vision.all import load_learner
import numpy as np
import cv2

learn = load_learner("./model/model_v1.25.pkl")
labels = learn.dls.vocab

# Create your views here.


class MushroomViewSet(viewsets.ModelViewSet):
    queryset = Mushroom.objects.all()
    serializer_class = MushroomSerializer


@api_view(['GET'])
def search_mushrooms(request):
    name = request.query_params.get('name', '')
    mushrooms = Mushroom.objects.filter(name__icontains=name)
    serializer = MushroomSerializer(mushrooms, many=True)
    return Response(serializer.data)


@csrf_exempt
def predict_mushroom(request):
    try:
        # Read binary data from request body
        img_data = request.body

        # Convert binary data to numpy array
        img_array = np.frombuffer(img_data, np.uint8)

        # Decode the numpy array as an image using OpenCV
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        pred, pred_idx, probs = learn.predict(img)
        # get the top 5 predictions
        mashed_ = []
        for mushroom_, prob in zip(learn.dls.vocab, probs):
            mashed_.append({'mushroom': mushroom_, 'probability': prob.item()})
        sorted_mashed = sorted(
            mashed_, key=lambda x: x['probability'], reverse=True)
        top_5_mushrooms = sorted_mashed[:5]

        # print(top_5_mushrooms[0].get('mushroom'))
        JsonRes = []


        for i in range(5):
            mushroom = Mushroom.objects.filter(
                s_name__icontains=top_5_mushrooms[i].get('mushroom'))
            serializer = MushroomSerializer(mushroom, many=True)

            if serializer.data:  # Check if the queryset is not empty
                JsonRes.append(
                    {
                        'predicted_id': serializer.data[0]['id'],
                        'predicted_name': serializer.data[0]['name'],
                        'name': top_5_mushrooms[i].get('mushroom'),
                        'probability': top_5_mushrooms[i].get('probability')
                    }
                )
            else:
                JsonRes.append(
                    {
                        'predicted_id': None,
                        'predicted_name': "Not currently in database",
                        'name': top_5_mushrooms[i].get('mushroom'),
                        'probability': top_5_mushrooms[i].get('probability')
            }
        )

        return JsonResponse(JsonRes, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


@csrf_exempt
def predict_more_mushroom(request):
    try:
        if request.method == 'POST':
            # Initialize an empty dictionary to store cumulative probabilities
            cumulative_probabilities = {}

            # Iterate through the uploaded files
            num_images = 0
            for key in request.FILES:
                img_file = request.FILES[key]
                img_data = img_file.read()
                img_array = np.frombuffer(img_data, np.uint8)
                img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

                pred, pred_idx, probs = learn.predict(img)

                # Update the cumulative probabilities
                for mushroom_, prob in zip(learn.dls.vocab, probs):
                    if mushroom_ in cumulative_probabilities:
                        cumulative_probabilities[mushroom_] += prob.item()
                    else:
                        cumulative_probabilities[mushroom_] = prob.item()

                num_images += 1

            # Calculate the average probabilities
            average_probabilities = {mushroom_: (cumulative_prob / num_images) for mushroom_, cumulative_prob in cumulative_probabilities.items()}

            # Get the top 5 results based on the average probabilities
            sorted_probabilities = sorted(average_probabilities.items(), key=lambda x: x[1], reverse=True)
            top_5_mushrooms = sorted_probabilities[:5]
            print(average_probabilities)

            # ... Add the rest of your code here to return the JsonResponse
            # ... (as in your original predict_mushroom function)
            JsonRes = []
            for i in range(5):
                mushroom = Mushroom.objects.filter(
                    s_name__icontains=top_5_mushrooms[i][0])
                serializer = MushroomSerializer(mushroom, many=True)

                if serializer.data:  # Check if the queryset is not empty
                    JsonRes.append(
                        {
                            'predicted_id': serializer.data[0]['id'],
                            'predicted_name': serializer.data[0]['name'],
                            'name': top_5_mushrooms[i][0],
                            'probability': top_5_mushrooms[i][1],
                        }
                    )
                else:
                    JsonRes.append(
                        {
                            'predicted_id': None,
                            'predicted_name': "Not currently in database",
                            'name': top_5_mushrooms[i][0],
                            'probability': top_5_mushrooms[i][1],
                }
            )
            return JsonResponse(JsonRes, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
